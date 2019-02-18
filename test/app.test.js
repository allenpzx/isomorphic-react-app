import App from '../client/app.js';
import ShallowRenderer from 'react-test-renderer/shallow';
const renderer = new ShallowRenderer();
renderer.render(<App />);
const result = renderer.getRenderOutput();
expect(result.type).toBe('div');
expect(result.props.children).toEqual([
    <span className="heading">Title</span>,
    <Subcomponent foo="bar" />
]);