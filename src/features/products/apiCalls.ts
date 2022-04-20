import { createAsyncThunk } from '@reduxjs/toolkit';
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
    fetch(API_BASE_URL, {
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
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
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