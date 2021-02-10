<div align="center">
  <br />
  <br />
  <img src="https://gblobscdn.gitbook.com/spaces%2F-M-tI8F1HM2T7LaWvK5j%2Favatar.png?alt=media">
</div>

<br />
<br />

<div align="center">
  <h3>
    <strong>
    Elegant Javascript Sdk for the Buycoins GraphQL API (Unofficial)
    </strong>
  </h3>
  <p>Build powerful apps around the Buycoins API with a lightweight, zero-dependencies, complete and expressive SDK 🚀. </p>
</div>

<br />

<div align="center">


[![github-actions-image]][github-actions-url] [![codecov-img]][codecov-url] [![npm-image]][npm-url] ![][typescript-image] [![license-image]][license-url]

</div>

<div align="center">
  <h3>
    <a href="https://developers.buycoins.africa/">
      Buycoins API Docs
    </a>
    <span> | </span>
    <a href="CONTRIBUTING.md">
      Contributing
    </a>
  </h3>
</div>


<div align="center">
  <sub>Built with ❤︎ by <a href="https://twitter.com/bahdcoder">Kati Frantz</a>
</div>

<br />
<br />

## Table of content

- [Basic Overview](#basic-overview)
- [Installation](#installation)
    - [Get API Keys](#get-api-keys)
    - [Install npm package](#install-npm-package)
    - [Requirements](#requirements)
- [Quickstart](#quickstart)
- [Queries](#queries)
    - [Get balances](#get-balances)
        - [Balance for a single currency](#balance-for-a-single-currency)
    - [Get bank accounts](#get-bank-accounts)
        - [Filter by bank account number](#filter-by-bank-account-number)
    - [Get estimated network fee](#get-estimated-network-fee)
        - [Network fee for a single currency](#network-fee-for-a-single-currency)
    - [Get buy and sell prices](#get-buy-and-sell-prices)
        - [Price for a single currency](#price-for-a-single-currency)
- [Mutations](#mutations)
    - [Create cryptocurrency addresses](#create-cryptocurrency-addresses)

## Basic Overview
The `@buycoins/sdk` project provides a simple way to integrate the Buycoins GraphQL API into your Node.js applications. This SDK will strive to support all operations exposed by the Buycoins API. At the moment, the following operations are supported:

- [Get balances](#get-balances)
- [Get bank accounts](#get-bank-accounts)
- [Get estimated network fee](#get-estimated-network-fee)
- [Get cryptocurrency prices](#get-cryptocurrency-prices)
- [Create cryptocurrency addresses](#create-cryptocurrency-addresses)

## Installation
The installation is in two steps: First: get your API keys, second: install the package into your project.

### Get API Keys
Before getting started, you would need to request access to the Buycoins API. You may send an [email to their support team](mailto:support@buycoins.africa), stating the application you would love to build. Shouldn't take more than an hour or two to get acces.

Once you do, visit your Buycoins account settings page to generate your API keys:

[![buycoins-api-settings-page](https://res.cloudinary.com/bahdcoder/image/upload/v1612330294/buycoins-visit-api-settings-page_fm7i1w.png)](https://buycoins.africa/settings/api)

### Install npm package
You may install the package using npm:

```shell
npm install --save @buycoins/sdk
```

Or yarn:

```shell
yarn add @buycoins/sdk
```

### Requirements
At the moment, the SDK has been fully tested on Node.js v12.x and 14.x. Versions above v12.x should work fine too.

## Quickstart
To quickly get started, let's make an API call to see the current prices of the cryptocurrencies supported by Buycoins.

First, require the `buycoins` function:

```js
const { buycoins } = require('@buycoins/sdk')
```

Next, call this function to get an API instance. You can pass in your public key and secret key as arguments into this function. 

```js
const { buycoins } = require('@buycoins/sdk')

const api = buycoins('YOWGe1KNuw', 'ed1wDGUuoVkID7rJ58vv0186z0vZ3TfbNXYiPsiC')
```

If you omit the public and secret key arguments, the sdk would default to using `BUYCOINS_PUBLIC_KEY` and `BUYCOINS_SECRET_KEY` environment variables.

On the `api` instance, the `.prices()` method would give you an instance of the `Prices` query. The `.get()` method on that query makes the API call and resolves with the data:

```js
const { buycoins } = require('@buycoins/sdk')

const api = buycoins()

api.prices().get().then(({ data }) => {
    console.log(data)
})
```

## Queries
### Get balances
This query may be used to access your currency balances. You may use the `.balances()` method on the api instance to get the balances query:

```js
const { data } = await buycoins().balances().get()
```

#### Balance for a single currency
To get the balance for a single currency, you may call any of the [supported currency methods](#supported-currency-methods) on the query instance:

```js
const { data } = await buycoins().balances().bitcoin().get()
```

### Get bank accounts
This query may be used to get all bank accounts attached to the connected Buycoins account. You may call the `.bankAccounts()` method on the api instance to get the bank accounts query:

```js
const { data } = await buycoins().bankAccounts().get()
```

#### Filter by bank account number
You may filter the bank accounts returned using the `.accountNumber()` method:

```js
const { data } = await buycoins().bankAccounts().accountNumber('0243911239').get()
```

### Get estimated network fee
You may retrieve the estimated network fee to send supported cryptocurrencies using the `.estimatedNetworkFee()` method. You also need to specify which currency you are interested in, and the amount of coins you want to transfer:

```js
const { data } = await buycoins().estimatedNetworkFee().amount(0.0213).ethereum().get()
```

You may use any of the [supported currency methods](#supported-currency-methods) to get the estimated network fee for a single currency.

### Get buy and sell prices
You may get the buy and sell prices of the supported currencies using the `.prices()` method. The `.buy()` and `.sell()` methods on this query can be used to get the buy prices and the sell prices respectively.

```js
const { data } = await buycoins().prices().sell().get()
```

#### Price for a single currency
To get the price for a specific currency, use any of the [supported currency methods](#supported-currency-methods) on the query instance.

```js
const { data } = await buycoins().prices().sell().litecoin().get()
```

## Mutations

### Create cryptocurrency addresses
To receive supported cryptocurrencies, you may create new addresses using the `.createAddress()` mutation:

```js
const { data } = await buycoins().createAddress().post()
```

If no currency is specified, this mutation will create a bitcoin address. To specify a currency, you may use any of the [supported currency methods](#supported-currency-methods):

```js
const { data } = await buycoins().createAddress().litecoin().post()
```

## Supported currency methods
These methods may be used to set or filter some queries or mutations by a specific currency.

- `.bitcoin()`
- `.litecoin()`
- `.usdTether()`
- `.usdCoin()`
- `.ethereum()`
- `.nairaToken()`

[github-actions-image]: https://img.shields.io/github/workflow/status/bahdcoder/buycoins-sdk/Tests%20&%20code%20coverage?style=for-the-badge
[github-actions-url]: https://github.com/bahdcoder/buycoins-sdk/actions "github-actions"

[npm-image]: https://img.shields.io/npm/v/@buycoins/sdk.svg?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/@buycoins/sdk "npm"

[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript

[license-url]: LICENSE.md
[license-image]: https://img.shields.io/github/license/bahdcoder/buycoins-sdk?style=for-the-badge
[codecov-img]: https://img.shields.io/codecov/c/gh/bahdcoder/buycoins-sdk?style=for-the-badge&token=ZO8QVVDTIB&logo=codecov
[codecov-url]: https://app.codecov.io/gh/bahdcoder/buycoins-sdk/
