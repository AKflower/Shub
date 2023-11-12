// Trong file User.tsx
import { useState, useEffect, ChangeEvent } from 'react';
import Languages from './Languages';
import Rules from './Rules';
import Permissions from './Permissions';
import Commands from './Commands';

interface UserProps {
  user: {
    username: string;
    password: string;
    scope: string;
    locale: string;
    lockPassword: boolean;
    perm: {
      admin: boolean;
    };
    commands: string[];
    rules: string[];
  };
  createUserDir: boolean;
  isNew: boolean;
  isDefault: boolean;
}

const User: React.FC<UserProps> = ({ user, createUserDir, isNew, isDefault }) => {
  const [createUserDirData, setCreateUserDirData] = useState(false);
  const [originalUserScope, setOriginalUserScope] = useState<string>("/");

  useEffect(() => {
    setOriginalUserScope(user.scope);
    setCreateUserDirData(createUserDir);
  }, [createUserDir, user.scope]);

  const handleCreateUserDirChange = () => {
    setCreateUserDirData((prev) => !prev);
  };

  const handleUserPermAdminChange = () => {
    if (!user.perm.admin) return;
    user.lockPassword = false;
  };

  const handleCreateUserDirDataChange = () => {
    user.scope = createUserDirData ? "" : originalUserScope;
  };

  return (
    <div>
      {!isDefault && (
        <p>
          <label htmlFor="username">Settings Username</label>
          <input
            className="input input--block"
            type="text"
            value={user.username}
            id="username"
          />
        </p>
      )}

      {!isDefault && (
        <p>
          <label htmlFor="password">Settings Password</label>
          <input
            className="input input--block"
            type="password"
            placeholder={isNew ? '' : 'Avoid Changes'}
            value={user.password}
            id="password"
          />
        </p>
      )}

      <p>
        <label htmlFor="scope">Settings Scope</label>
        <input
          disabled={createUserDirData}
          placeholder={createUserDir ? 'User Scope Generation Placeholder' : ''}
          className="input input--block"
          type="text"
          value={user.scope}
          id="scope"
        />
      </p>

      {isNew && createUserDir && (
        <p className="small">
          <input
            type="checkbox"
            checked={createUserDirData}
            onChange={handleCreateUserDirChange}
          />
          Create User Home Directory
        </p>
      )}

      <p>
        <label htmlFor="locale">Settings Language</label>
        <Languages locale={user.locale} />
      </p>

      {!isDefault && (
        <p>
          <input
            type="checkbox"
            disabled={user.perm.admin}
            checked={user.lockPassword}
            onChange={() => (user.lockPassword = !user.lockPassword)}
          />
          Lock Password
        </p>
      )}

      <Permissions perm={user.perm} />
      {isExecEnabled && <Commands commands={user.commands} />}

      {!isDefault && (
        <div>
          <h3>Settings Rules</h3>
          <p className="small">Settings Rules Help</p>
          <Rules rules={user.rules} />
        </div>
      )}
    </div>
  );
};

export default User;
