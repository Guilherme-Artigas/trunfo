export interface IValidateForm {
  cardName: string;
  cardDescription: string;
  cardAttr1: string;
  cardAttr2: string;
  cardAttr3: string;
  cardImage: string;
}

function verifyTextFields(cardName: string, cardDescription: string, cardImage: string): boolean {
  return cardName.length > 0 && cardDescription.length > 0 && cardImage.length > 0;
}

function verifyNumberFields(attrOne: string, attrTwo: string, attrThree: string): boolean {
  const attr1 = Number(attrOne);
  const attr2 = Number(attrTwo);
  const attr3 = Number(attrThree);

  const sumBelow = (attr1 + attr2 + attr3) <= 210;
  const allUnder = attr1 <= 90 && attr2 <= 90 && attr3 <= 90;
  const allAbove = attr1 >= 0 && attr2 >= 0 && attr3 >= 0;
  const invalidTextFields = attrOne !== '' && attrTwo !== '' && attrThree !== '';

  return sumBelow && allUnder && allAbove && invalidTextFields;
}

export function validateForm(payload: IValidateForm): boolean {
  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage
  } = payload;

  const textFields = verifyTextFields(cardName, cardDescription, cardImage);
  const numberFields = verifyNumberFields(cardAttr1, cardAttr2, cardAttr3);

  return textFields && numberFields;
}
