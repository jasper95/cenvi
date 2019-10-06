import { useState } from 'react';
import capitalize from 'lodash/capitalize';
import { useSelector, useDispatch } from 'react-redux';
import {
  showSuccess,
} from 'shared/redux/app/reducer';
import axios from 'shared/utils/axios';

const basicAuth = Buffer.from(
  `${process.env.REACT_APP_API_USERNAME}:${process.env.REACT_APP_API_PASSWORD}`,
).toString('base64');

export default function useMutation(params) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const state = {
    loading,
    data,
    error,
  };

  return [state, mutate];
  async function mutate(params2 = {}) {
    setLoading(true);
    const allParams = { ...params, ...params2 };
    const {
      data: body,
      method = 'POST',
      onSuccess = () => {},
      message,
      hideDialog = true,
    } = allParams;
    let { url } = allParams;
    if (method.toLowerCase() === 'delete' && body.id) {
      url = `${url}/${body.id}`;
    }
    const response = await axios({
      data: body,
      method,
      url,
    }).catch((err) => {
      setError(err);
      return null;
    });
    setLoading(false);
    if (response) {
      setData(response);
      onSuccess(response);
      if (message) {
        dispatch(showSuccess({ message, hideDialog }));
      }
    }
    return response;
  }
}

export function useCreateNode(params) {
  const { node, message = `${capitalize(node)} successfully created` } = params;
  return useMutation({
    ...params,
    message,
    method: 'POST',
    url: `/${node}`,
  });
}

export function useUpdateNode(params) {
  const { node, message = `${capitalize(node)} successfully updated` } = params;
  return useMutation({
    ...params,
    message,
    method: 'PUT',
    url: `/${node}`,
  });
}

export function useDeleteNode(params) {
  const { node, message = `${capitalize(node)} successfully deleted` } = params;
  return useMutation({
    ...params,
    message,
    method: 'DELETE',
    url: `/${node}`,
  });
}
