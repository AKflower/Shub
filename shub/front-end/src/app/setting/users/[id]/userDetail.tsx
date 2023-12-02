import UserForm from "@/app/components/settings/user/userForm"

export default function UserDetail ({title}:{title:string}) {
    return (
        <UserForm title={title} />
    )
}