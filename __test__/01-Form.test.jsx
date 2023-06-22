import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

describe('<Form />', () => {
  afterEach(() => localStorage.clear());

  it('É possível atribuir nome as cartas:', () => {
    render(<Home />);
    const cardName = screen.getByTestId(/name-input/i);
    fireEvent.change(cardName, { target: { value: 'Charmander' } });
    expect(cardName).toBeInTheDocument();
  });

  it('É possível atribuir descrição as cartas:', () => {
    render(<Home />);
    const cardDescription = screen.getByTestId(/description-input/i);
    fireEvent.change(cardDescription, { target: { value: 'Tem preferência por coisas quentes.' } });
    expect(cardDescription).toBeInTheDocument();
  });

  it('É possível atribuir atributo 01 as cartas:', () => {
    render(<Home />);
    const attr1 = screen.getByTestId(/attr1-input/i);
    fireEvent.change(attr1, { target: { value: '80' } });
    expect(attr1).toBeInTheDocument();
  });

  it('É possível atribuir atributo 02 as cartas:', () => {
    render(<Home />);
    const attr2 = screen.getByTestId(/attr2-input/i);
    fireEvent.change(attr2, { target: { value: '50' } });
    expect(attr2).toBeInTheDocument();
  });

  it('É possível atribuir atributo 03 as cartas:', () => {
    render(<Home />);
    const attr3 = screen.getByTestId(/attr3-input/i);
    fireEvent.change(attr3, { target: { value: '70' } });
    expect(attr3).toBeInTheDocument();
  });

  it('É possível atribuir uma imagem as cartas:', () => {
    render(<Home />);
    const imageInput = screen.getByTestId(/image-input/i);
    fireEvent.change(imageInput, { target: {
      value: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'
    } });
    expect(imageInput).toBeInTheDocument();
  });

  it('É possível selecionar raridade para as cartas:', () => {
    render(<Home />);
    const cardRare = screen.getByTestId(/rare-input/i);
    fireEvent.change(cardRare, { target: { value: 'muito raro' } });
    expect(cardRare).toBeInTheDocument();
  });

  it('É possível marcar uma carta como Super Trunfo:', () => {
    render(<Home />);
    const trunfoInput = screen.getByTestId(/trunfo-input/i);
    fireEvent.click(trunfoInput);
    expect(trunfoInput).toBeInTheDocument();
  });

  it('É possível salvar cartas:', () => {
    render(<Home />);
    const cardName = screen.getByTestId(/name-input/i);
    fireEvent.change(cardName, { target: { value: 'Bulbasaur' } });

    const cardDescription = screen.getByTestId(/description-input/i);
    fireEvent.change(cardDescription, { target: { value: 'Ele é uma planta.' } });

    const attr1 = screen.getByTestId(/attr1-input/i);
    fireEvent.change(attr1, { target: { value: '25' } });

    const attr2 = screen.getByTestId(/attr2-input/i);
    fireEvent.change(attr2, { target: { value: '10' } });

    const attr3 = screen.getByTestId(/attr3-input/i);
    fireEvent.change(attr3, { target: { value: '90' } });

    const imageInput = screen.getByTestId(/image-input/i);
    fireEvent.change(imageInput, { target: {
      value: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
    } });

    const cardRare = screen.getByTestId(/rare-input/i);
    fireEvent.change(cardRare, { target: { value: 'raro' } });

    const trunfoInput = screen.getByTestId(/trunfo-input/i);
    fireEvent.click(trunfoInput);

    const buttonSave = screen.getByTestId(/save-button/i);
    fireEvent.click(buttonSave);
    expect(buttonSave).toBeInTheDocument();
  });

  it('Não é possível cadastrar mais de uma carta Super Trunfo:', () => {
    const inputMock = [
      {
        cardName: 'Charmander',
        cardDescription: 'Tem preferência por coisas quentes',
        attr1: '80',
        attr2: '50',
        attr3: '70',
        cardImage: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        cardRare: 'muito raro',
        cardTrunfo: true
      }
    ];

    localStorage.setItem('cardsList', JSON.stringify(inputMock));

    render(<Home />);

    const hasTrunfoText = screen.getByText(/Você já tem um Super Trunfo em seu baralho/i);

    expect(hasTrunfoText).toBeInTheDocument();
  });
});
