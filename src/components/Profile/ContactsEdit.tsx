import { HeaderProfileSection, SectionProfile, InfoProfileSection } from "./ProfileSection"
import InputProfile from "./InputProfile"
import { IUser } from "../../classes/IUser"
import { IContacts } from "../../classes/contacts"

interface ContactEditProps {
  getContacts: () => IContacts, 
  setContacts: (newContacts: any) => void
}

const ContactEdit: React.FC<ContactEditProps> = ({ getContacts, setContacts }) => {
  return (
    <SectionProfile>
        <HeaderProfileSection>Контакты</HeaderProfileSection>
        <InfoProfileSection>
        <InputProfile 
            title="Номер телефона"
            setProperty={(text: string) => {
              setContacts({ 
                ...getContacts(),
                phone: text
              })
            }}
            value={getContacts().phone}
          />
          <InputProfile 
            title="WhatsApp"
            setProperty={(text: string) => {
              setContacts({ 
                ...getContacts(),
                whatsapp: text
              })
            }}
            value={getContacts().whatsapp}
          />
          <InputProfile 
            title="VK"
            setProperty={(text: string) => {
              setContacts({ 
                ...getContacts(),
                vk: text
              })  
            }}
            value={getContacts().vk}
          />
          <InputProfile 
            title="Telegram"
            setProperty={(text: string) => {
              setContacts({ 
                ...getContacts(),
                telegram: text
              })
            }}
            value={getContacts().telegram}
          />
        </InfoProfileSection>
      </SectionProfile>
  )
}

export default ContactEdit;