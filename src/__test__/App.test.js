import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import CreateNote from 'src/components/CreateNote';
import Notes from 'src/components/Notes';
import { render, screen } from '@testing-library/react'

// we need to mock react-router-dom for allowing useLocation hook in shallow copy
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/create-note"
    })
}));

describe('boundary', () => {
    it(`AppTest boundary should mount App without crashing`, () => {
        const component = shallow(<App />);
        expect(component.getElements()).toMatchSnapshot();
        component.unmount();
    });

    it(`AppTest boundary should mount CreateNote without crashing`, () => {
        const component = shallow(<CreateNote />);
        expect(component.getElements()).toMatchSnapshot();
        component.unmount();
    });

    it(`AppTest boundary should mount Notes without crashing`, () => {
        const component = shallow(<Notes />);
        expect(component.getElements()).toMatchSnapshot();
        component.unmount();
    });
});

describe('functional', () => {
    it(`AppTest boundary must contain 3 Links`, () => {
        const component = shallow(<App />);
        expect(component.find(`Link`)).toHaveLength(3);
    });

    // it(`AppTest boundary links value`, () => {
    //     expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', 'https://www.test.com/');
    // const linkEl = screen.getByRole('Link', { name: 'Home' });
    // expect(getByText("Click Me").href).toBe("https://www.test.com/")
    // expect(linkEl).toHaveAttribute('href', '...')
    // });
});
