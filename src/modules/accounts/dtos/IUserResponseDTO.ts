interface IUserResponseDTO {
  name: string;
  email: string;
  driverLicense: string;
  id: string;
  avatar?: string;
  avatarUrl(): string;
}

export { IUserResponseDTO };
