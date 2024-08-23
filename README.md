## The Project

The project is set up using React, Next.js, Typescript and Styled-Components, and it's utilizing a theme for the styles.

I'm using Testing-Library and Jest for the tests.

The folder structure is according to Next.js' app routing convention. All the modules or pages will be inside the app folder under src and their components will be under the root's components folder. This structure is ideal for scalability and I find it to be super flexible as the project grows. 

## Running The Project

Run the following commands:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running The Tests

```bash
yarn test
```

## Usage

The modal is made of the following parts:

- **Modal.Header**
- **Modal.Body**
- **Modal.Footer**

They should be wrapped by the `Modal` component.

The Header component has a required property called `titleAsText` which is a stringified version of the title for the screen readers announcements.

Similar to the Header component, Body component also has a required property called `descriptionAsText` which is a stringified version of the content of the modal for the screen readers announcements.

### Example

```JSX
<Modal onModalClose={closeModalFunction}>
  <Modal.Header titleAsText="Stringified title of the modal">
    Title of the modal
  </Modal.Header>
  <Modal.Body descriptionAsText="Description of the modal content">
    Second Modal Content
  </Modal.Body>
  <Modal.Footer>
    <Modal.CloseButton>Close</Modal.CloseButton>
  </Modal.Footer>
</Modal>
```

## Notes:

- I've used [a11y](https://github.com/reactjs/react-a11y) before in other projects to create accessible components. They now suggest to use [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react) instead, but I decided not to use any external libraries for this particular project since it would be an overkill in my opinion and I wanted to showcase my own understanding of raw accessibility implementation but for a larger scale project I would definitely use [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react).
- I've created a nested modal implementation with a few edge cases to demonstrate how multiple active modals in the page would work.