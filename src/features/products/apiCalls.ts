import { createAsyncThunk } from '@reduxjs/toolkit';
import { useState } from 'react';
import { API_BASE_URL } from '../../util/config';
import { Product } from './productSlice';

export enum TypePrefix {
  BASE = 'products',
  ADD = 'products/addProducts',
  GET = 'products/getProducts',
  DELETE = 'products/deleteProducts',
  UPDATE = 'products/updateProducts',
}

export const getProducts = createAsyncThunk(TypePrefix.GET, async () => {
  return fetch(API_BASE_URL).then((res) => res.json());
});

export const addProducts = createAsyncThunk(
  TypePrefix.ADD,
  async ({ name, description, email, quantity, date }: Product) => {
    await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        quantity: quantity,
        date: date,
        description: description,
        email: email,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response;
      })
      .then((data) => {
        console.log('Success:', data);
      });
  }
);

export const updateProducts = createAsyncThunk(
  TypePrefix.UPDATE,
  async ({ name, description, email, quantity, date, id }: Product) => {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        quantity: quantity,
        date: date,
        description: description,
        email: email,
        id: id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }
        return response;
      })
      .then((data) => {
        console.log('Success:', data);
      });
  }
);

export const deleteProducts = createAsyncThunk(
  TypePrefix.DELETE,
  async (id: number) => {
    fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
);

enum HTTP_METHODS {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
}

interface FetchOptions {
  method: string;
  headers: {};
  body?: {};
}

const obj = {
  firstName: 'fname',
  lastName: 'lname',
  age: 21,
  id: 1,
};
let { id } = obj;

/**
 *
 * @param url api URL
 * @param method HTTP method used in the request
 * @param productData Product object (optional)
 */
function useFetch(url: string, method: HTTP_METHODS, productData?: Product) {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();
  let dto;

  switch (method) {
    case HTTP_METHODS.GET || HTTP_METHODS.DELETE:
      dto = { id: productData!.id };
      break;
    case HTTP_METHODS.POST:
      dto = {
        name: productData!.name,
        quantity: productData!.quantity,
        description: productData!.description,
        email: productData!.email,
      };
      break;
    case HTTP_METHODS.UPDATE:
      dto = productData;
      break;
  }

  const endpoint: string =
    method === HTTP_METHODS.GET
      ? API_BASE_URL
      : `${API_BASE_URL}/${productData?.id}`;
  const fetchOptions: FetchOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: dto,
  };

  createAsyncThunk(TypePrefix.ADD, async (productData: Product) => {
    fetch(endpoint);
  });
}
