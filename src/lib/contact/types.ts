export interface ContactEmail {
  label: string;
  value: string;
  iconKey: string;
}
export interface ContactSocial {
  label: string;
  value: string;
  link: string;
  iconKey: string;
}
export interface ContactGithub {
  label: string;
  username: string;
  link: string;
}
export interface ContactData {
  github: ContactGithub;
  emails: ContactEmail[];
  socials: ContactSocial[];
}
