import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { OptionsType } from "react-select";
import { TagInput, TagBase } from "../../../types/Tag";
import { TagFactory } from "../../../factories";

type TagOption = {
  label: string;
  value: TagBase;
};

const getAsOptions = (tags: TagBase[]): OptionsType<TagOption> => {
  return tags.map((tag) => ({
    label: tag.name.toLowerCase(),
    value: tag,
  }));
};

interface TagMultiSelectProps {
  onChange: (selectedTags: TagBase[]) => void;
  selected: TagBase[];
}

const TagMultiSelect: React.FC<TagMultiSelectProps> = ({
  onChange,
  selected,
}): JSX.Element => {
  const [loadedTags, setLoadedTags] = useState<TagBase[]>([]);

  useEffect(() => {
    const fetchTags = async (): Promise<void> => {
      setLoadedTags(TagFactory.buildList(4));
    };

    fetchTags();
  }, []);

  const handleChange = (newOptions: OptionsType<TagOption> | null): void => {
    onChange(newOptions?.map((option) => option.value) || []);
  };

  const handleCreate = (inputValue: string): void => {
    const newTag: TagInput = { name: inputValue.toLowerCase() };

    handleChange(getAsOptions(selected.concat(newTag))); // bubble up
  };

  return (
    <CreatableSelect
      isMulti
      isClearable
      options={getAsOptions(loadedTags)}
      value={getAsOptions(selected)}
      onCreateOption={handleCreate}
      onChange={(newOptions) =>
        handleChange(newOptions as OptionsType<TagOption>)
      }
      formatCreateLabel={(inputValue) => `create ${inputValue.toLowerCase()}`}
    />
  );
};

export default TagMultiSelect;
// on remove value, if createdTags, remove. Gives whole new selected
// on create diff than select, can add to createdTags

/**
 * If the tag is already created, don't create it again. Pass it up to the form with all the info.
 * If it's not already created, pass the input up. Type for EITHER input or complete.
 * When the InfoCard is created, loop over attached tags. If they don't exist, create them before assigning.
 * On the front-end, store tags by adding to selection; selected shown should be fetched.
 */
