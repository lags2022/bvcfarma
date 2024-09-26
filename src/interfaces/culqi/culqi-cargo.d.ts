export interface CulqiCharge {
  object:              string;
  id:                  string;
  creationDate:        string;
  amount:              number;
  amountRefunded:      string;
  currentAmount:       number;
  installments:        string;
  installmentsAmount:  number;
  currencyCode:        string;
  email:               string;
  description:         string;
  source:              Source;
  outcome:             Outcome;
  fraudScore:          number;
  antifraudDetails:    AntifraudDetails;
  dispute:             boolean;
  referenceCode:       string;
  duplicated:          boolean;
  metadata:            Metadata;
  feeDetails:          FeeDetails;
  paid:                boolean;
  statementDescriptor: string;
  operations:          Operations;
}

export interface AntifraudDetails {
  firstName:   string;
  lastName:    string;
  address:     string;
  addressCity: string;
  countryCode: string;
  phone:       string;
}

export interface FeeDetails {
  fixedFee:    Metadata;
  variableFee: Metadata;
}

export interface Metadata {
}

export interface Operations {
  type:         string;
  operationID:  string;
  creationDate: number;
}

export interface Outcome {
  type:            string;
  code:            string;
  declineCode:     string;
  merchantMessage: string;
  userMessage:     string;
}

export interface Source {
  object:       string;
  id:           string;
  type:         string;
  creationDate: number;
  email:        string;
  cardNumber:   string;
  lastFour:     string;
  active:       boolean;
  iin:          Metadata;
  client:       Metadata;
  metadata:     Metadata;
}
