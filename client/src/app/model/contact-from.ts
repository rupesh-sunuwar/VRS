export class ContactForm {

  id:string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phoneNumber?: string;
  toUser?: string;
  country?: string;
  replies: string[]; // Specify the type of elements in the array

  constructor(id:string,
    name: string,
    email: string,
    subject: string,
    message: string,
    toUser: string,
    phoneNumber?: string,
    country?: string,
    replies?: string[] // Update the type here as well
  ) {
    this.id=id;
    this.name = name;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.toUser = toUser;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.replies = replies || []; // Initialize with an empty array if no replies are provided
  }
}
