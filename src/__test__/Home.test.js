import Home from './../components/Home';
import { shallow } from 'enzyme';

describe('boundary', () => {
    it('HomeTest boundary should contain Home as text on Home page', () => {
        const toggleInstance = shallow(<Home />);
        const element = toggleInstance.find('div');
        expect(element.text()).toBe('Home');
    });
});