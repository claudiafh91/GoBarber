import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import { MdPhotoCamera } from 'react-icons/md';

import api from '~/services/api';
import { Container, SelectImage } from './styles';

export default function Banner() {
  const { defaultValue, registerField } = useField('Banner');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'bannerId',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [defaultValue]);	// eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('/banner', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <SelectImage>
            <MdPhotoCamera size="30" color="#999" />
            <span>Selecionar imagem</span>
          </SelectImage>
        )}
        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          ref={ref}
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}
