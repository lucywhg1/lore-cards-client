import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { OptionsType, StylesConfig, ValueType } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';

import TagService from '../../../services/TagService';
import { colors } from '../../../theme';
import { isTagInput, TagBase, TagInput } from '../../../types/Tag';

interface TagOption {
  label: string;
  value: string;
  data: TagBase;
}

const getAsOptions = (tags: TagBase[]): OptionsType<TagOption> => {
  return tags.map((tag) => ({
    label: tag.name,
    value: `option-${ tag.name }`,
    data: tag
  }));
};

const optionStyle: StylesConfig = {
  multiValue: (provided, { data }) => {
    const color = isTagInput(data.data) ? colors.info : colors.dark; // custom color for pending tag creation
    return {
      ...provided,
      backgroundColor: color.alpha(0.3).css(),
      color: color.css()
    };
  }
};

interface TagCreatableSelectProps {
  onChange: (selected: TagBase[]) => void;
  selected: TagBase[];
}

const TagCreatableSelect: React.FC<TagCreatableSelectProps> = ({
  onChange,
  selected
}): JSX.Element => {
  const [loadedTags, setLoadedTags] = useState<TagBase[]>([]);

  useEffect(() => {
    const fetchTags = async (): Promise<void> => {
      const tagService = new TagService();

      tagService
        .getAll()
        .then((response) => setLoadedTags(response))
        .catch((e: Error) => toast.error(`Unable to get Tags. ${ e.message }`));
    };

    fetchTags();
  }, []);

  const handleChange = (newOptions: ValueType<TagOption>): void => {
    const selectedOptions = newOptions !== null ? (newOptions as OptionsType<TagOption>) : [];

    onChange((selectedOptions).map((option) => option.data) || []);
  };

  const handleCreate = (inputValue: string): void => {
    const newTag: TagInput = { name: inputValue.toLowerCase() };

    handleChange(getAsOptions(selected.concat(newTag))); // bubble up
  };

  return (
    <>
      <Form.Label>Tags</Form.Label>
      <CreatableSelect
        isMulti
        options={getAsOptions(loadedTags)}
        value={getAsOptions(selected)}
        onCreateOption={handleCreate}
        onChange={handleChange}
        formatCreateLabel={(inputValue) =>
          `create "${ inputValue.toLowerCase() }"`
        }
        styles={optionStyle}
      />
    </>
  );
};

export default TagCreatableSelect;
