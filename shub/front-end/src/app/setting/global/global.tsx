import GlobalSettingForm from "./globalSettingForm/globalSettingForm"
import UserDefaultSettingForm from "./userDefaultSettingForm/userDefaultSettingForm"
export default function Global() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <GlobalSettingForm />
            <UserDefaultSettingForm />
        </div>
       
    )
}