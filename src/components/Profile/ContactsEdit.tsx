import { HeaderProfileSection, SectionProfile, InfoProfileSection } from "./ProfileSection"
import InputProfile from "./InputProfile"
import { ProfileEditProps } from "../../interfaces/ProfileEditProps"

const ContactEdit: React.FC<ProfileEditProps> = ({ userData, setUserData }) => {
  return (
    <SectionProfile>
        <HeaderProfileSection>Контакты</HeaderProfileSection>
        <InfoProfileSection>
        <InputProfile 
            title="Номер телефона"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    contacts: {
                      ...userData.user?.user_info?.contacts,
                      phone: text
                    }
                  }
                }})}
            }
            value={userData.user?.user_info?.contacts?.phone}
          />
          <InputProfile 
            title="WhatsApp"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    contacts: {
                      ...userData.user?.user_info?.contacts,
                      whatsapp: text
                    }
                  }
                }})}
            }
            value={userData.user?.user_info?.contacts?.whatsapp}
          />
          <InputProfile 
            title="VK"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    contacts: {
                      ...userData.user?.user_info?.contacts,
                      vk: text
                    }
                  }
                }})}
            }
            value={userData.user?.user_info?.contacts?.vk}
          />
          <InputProfile 
            title="Telegram"
            setProperty={(text: string) => {
              setUserData({
                ...userData,
                user: {
                  ...userData.user,
                  user_info: {
                    ...userData.user?.user_info,
                    contacts: {
                      ...userData.user?.user_info?.contacts,
                      telegram: text
                    }
                  }
                }})}
            }
            value={userData.user?.user_info?.contacts?.telegram}
          />
        </InfoProfileSection>
      </SectionProfile>
  )
}

export default ContactEdit;