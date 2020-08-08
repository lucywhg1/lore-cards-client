import React, { useState, useEffect } from 'react';
import { InfoCardPreview } from '../../types';
import { ActionMeta, createFilter } from 'react-select';
import InfoCardService from '../../services/InfoCardService';
import { toast } from 'react-toastify';
import Select from 'react-select';

interface CardOption {
  label: string;
  value: InfoCardPreview;
}

const getAsOptions = (cards: InfoCardPreview[]): CardOption[] => {
  return cards.map((preview) => ({
    label: preview.title,
    value: preview
  }));
};

interface CardSearchProps {
  onSelect: (id: number) => void;
}

const CardSearch: React.FC<CardSearchProps> = ({ onSelect }): JSX.Element => {
  const [availableCards, setAvailableCards] = useState<InfoCardPreview[]>([]);

  useEffect(() => {
    const fetchCards = async (): Promise<void> => {
      const infoCardService = new InfoCardService();

      infoCardService
        .getAll()
        .then((response) => {
          setAvailableCards(response);
        })
        .catch((e: Error) =>
          toast.error(`Unable to get Info Cards. ${e.message}`)
        );
    };

    fetchCards();
  }, []);

  const handleChange = (
    selectedOption: CardOption,
    actionMeta: ActionMeta<CardOption>
  ): void => {
    if (actionMeta.action === 'set-value') {
      onSelect(selectedOption.value.id);
    }
  };

  return (
    <Select
      options={getAsOptions(availableCards)}
      onChange={(value, action) =>
        handleChange(value as CardOption, action as ActionMeta<CardOption>)
      }
      filterOption={createFilter({ ignoreCase: true, ignoreAccents: true })}
    />
  );
};

export default CardSearch;
