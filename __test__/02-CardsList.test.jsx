import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Home from '../src/pages/index';

const inputMock = [
  {
    cardName: 'Squirtle',
    cardDescription: 'Esguicha água com força vigorosa.',
    attr1: '65',
    attr2: '60',
    attr3: '85',
    cardImage: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
    cardRare: 'raro',
    cardTrunfo: false
  },
  {
    cardName: 'Pikachu',
    cardDescription: 'Descarrega energia armazenada nas bolsas de suas bochechas.',
    attr1: '60',
    attr2: '70',
    attr3: '50',
    cardImage: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
    cardRare: 'normal',
    cardTrunfo: false
  },
  {
    cardName: 'Charmander',
    cardDescription: 'Tem preferência por coisas quentes.',
    attr1: '80',
    attr2: '50',
    attr3: '70',
    cardImage: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
    cardRare: 'muito raro',
    cardTrunfo: true
  }
];

describe('<Home />', () => {
  afterEach(() => localStorage.clear());

  it('É possível deletar cartas cadastradas:', () => {
    localStorage.setItem('cardsList', JSON.stringify(inputMock));

    render(<Home />);

    const hasTrunfoText = screen.getByText(/Você já tem um Super Trunfo em seu baralho/i);
    expect(hasTrunfoText).toBeInTheDocument();

    const buttonShowCards = screen.getByText(/mostrar cartas/i);
    expect(buttonShowCards).toBeInTheDocument();
    fireEvent.click(buttonShowCards);

    const buttonDelleteCard = screen.getAllByText(/excluir/i);
    expect(buttonDelleteCard.length).toBe(3);
    fireEvent.click(buttonDelleteCard[2]);
  });

  it('É possível realizar filtros por Card Name:', () => {
    localStorage.setItem('cardsList', JSON.stringify(inputMock));

    render(<Home />);

    const buttonShowCards = screen.getByText(/mostrar cartas/i);
    fireEvent.click(buttonShowCards);

    const searchName = screen.getByTestId(/searchname/i);
    expect(searchName).toBeInTheDocument();

    fireEvent.change(searchName, { target: { value: 'pikachu' } });
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    fireEvent.change(searchName, { target: { value: '' } });
    const allCards = screen.getAllByText(/excluir/i);
    expect(allCards.length).toBe(3);
  });

  it('É possível realizar filtros por Raridade normal:', () => {
    localStorage.setItem('cardsList', JSON.stringify(inputMock));

    render(<Home />);

    const buttonShowCards = screen.getByText(/mostrar cartas/i);
    fireEvent.click(buttonShowCards);

    const searchRarity = screen.getByTestId(/searchRarity/i);
    expect(searchRarity).toBeInTheDocument();
    fireEvent.change(searchRarity, { target: { value: 'normal' } });

    const pikachu = screen.getAllByText(/pikachu/i)[0];
    expect(pikachu).toBeInTheDocument();
  });

  it('É possível realizar filtros por Raridade raro:', () => {
    localStorage.setItem('cardsList', JSON.stringify(inputMock));

    render(<Home />);

    const buttonShowCards = screen.getByText(/mostrar cartas/i);
    fireEvent.click(buttonShowCards);

    const searchRarity = screen.getByTestId(/searchRarity/i);
    expect(searchRarity).toBeInTheDocument();
    fireEvent.change(searchRarity, { target: { value: 'raro' } });

    const squirtle = screen.getAllByText(/squirtle/i)[0];
    expect(squirtle).toBeInTheDocument();
  });

  it('É possível realizar filtros por Raridade muito raro:', () => {
    localStorage.setItem('cardsList', JSON.stringify(inputMock));

    render(<Home />);

    const buttonShowCards = screen.getByText(/mostrar cartas/i);
    fireEvent.click(buttonShowCards);

    const searchRarity = screen.getByTestId(/searchRarity/i);
    expect(searchRarity).toBeInTheDocument();
    fireEvent.change(searchRarity, { target: { value: 'muito raro' } });

    const charmander = screen.getAllByText(/charmander/i)[0];
    expect(charmander).toBeInTheDocument();
  });

  it('É possível resetar a lista original pelo campo select:', () => {
    localStorage.setItem('cardsList', JSON.stringify(inputMock));

    render(<Home />);

    const buttonShowCards = screen.getByText(/mostrar cartas/i);
    fireEvent.click(buttonShowCards);

    const searchRarity = screen.getByTestId(/searchRarity/i);
    expect(searchRarity).toBeInTheDocument();
    fireEvent.change(searchRarity, { target: { value: 'todas' } });

    const allCards = screen.getAllByText(/excluir/i);
    expect(allCards.length).toBe(3);
  });

  it('', () => {
    localStorage.setItem('cardsList', JSON.stringify(inputMock));

    render(<Home />);

    const buttonShowCards = screen.getByText(/mostrar cartas/i);
    fireEvent.click(buttonShowCards);

    const searchTrunfo = screen.getByTestId(/searchtrunfo/i);
    expect(searchTrunfo).toBeInTheDocument();

    fireEvent.click(searchTrunfo);

    const allCards = screen.getAllByText(/charmander/i);
    expect(allCards[0]).toBeInTheDocument();

    fireEvent.click(searchTrunfo);

    expect(allCards.length).toBe(1);
  });
});
