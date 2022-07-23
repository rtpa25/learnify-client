export interface User {
  _id: string;
  email: string;
  supertokensId: string;
  createdAt: Date;
  updatedAt: Date;
  thirdParty?: ThirdPartyInfo;
}

export interface ThirdPartyInfo {
  id: string;
  userId: string;
}
