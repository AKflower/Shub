export class Role {
    role_id?: string;
    idInt?: number;
    role_name?: string;
    role_organization?: string;
    level: number;
    role_type?: number;
    role_permissionIds?: string[];
  
    constructor({ idInt, role_name, role_organization, level, role_type }: {
      idInt?: number;
      role_name?: string;
      role_organization?: string;
      level: number;
      role_type?: number;
    }) {
      this.idInt = idInt;
      this.role_name = role_name;
      this.role_organization = role_organization;
      this.level = level;
      this.role_type = role_type;
    }
  }