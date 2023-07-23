# Stellar Burgers Website

[GitHub Pages](https://basnor.github.io/react-burger/)

[Figma layouts](https://www.figma.com/file/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?type=design&node-id=0-1&mode=design)

You can customize and buid your own burger using a wide range of space ingredients. UI will help you to calculate total cost of the order, underline the status of your order and its details. Moveover, there are personal account available only for authorized users. Finally, you can find various boards with total and personal order feed.

This project is bootstrapped with Create React App and is connected to an API via REST and WebSocket protocols. The authentication is implemented with help of tokens and cookies.

Key technologies:

- React
- React DnD
- Redux Toolkit
- TypeScript
- WebSocket
- Token-Based Authentication
- Cookies
- Jest & Cypress

Project base structure:
```
.
├── components
│   ├── app
│   ├── app-header
│   ├── base-layout
│   ├── burger-constructor
│   ├── burger-ingredients
│   ├── custom-drag-layer
│   ├── ingredient-details
│   ├── modal
│   ├── order-details
│   ├── order-feed-item
│   ├── order-feed-stats
│   ├── profile-details
│   ├── profile-sidebar
│   └── protected-route
├── features
│   ├── auth
│   ├── burger-constructor
│   ├── create-order
│   ├── feed
│   ├── forgot-password
│   ├── ingredients
│   ├── refresh-token
│   ├── register
│   ├── reset-password
│   └── user
├── hooks
├── images
├── pages
├── services
└── utils
```
