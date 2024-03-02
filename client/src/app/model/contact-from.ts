export class ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
  toUser?: string;
  country?: string;

  constructor(
    name: string,
    email: string,
    subject: string,
    message: string,
    toUser: string,
    phoneNumber?: string,
    country?: string,
  ) {
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.toUser = toUser;
    this.phoneNumber = phoneNumber;
    this.country = country;
  }
}
