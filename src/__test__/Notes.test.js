// import { render, screen } from "@testing-library/react";
import { render, screen } from "@testing-library/react"
import Notes from "src/components/Notes";

describe('boundary', () => {
    test('NotesTest boundary should contain All Notes text', async () => {
        render(<Notes />);
        expect(screen.getByText(/All Notes/).textContent).not.toBeNull();
    })
});
