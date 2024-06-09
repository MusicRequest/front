import React, { useState, useEffect, FC } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface VListSelectProps {
  value: string;
  list: any[];
  searchTerm?: string;
  valueProperty?: string;
  titleProperty?: string;
  subtitleProperty?: string;
  imageProperty?: string;
  onChange: (el: any) => void;
}

const SelectList: FC<VListSelectProps> = ({
  value,
  list,
  searchTerm = "",
  valueProperty = "@id",
  titleProperty = "model",
  subtitleProperty = "manufacturer",
  imageProperty = "image.contentUrl",
  onChange,
}) => {
  const [paginationProperties, setPaginationProperties] = useState({
    itemsPerPage: 5,
    activePage: 1,
    nextButtonIsDisabled: true,
    min: 0,
    max: 0,
    totalItems: 0,
  });

  const getClass = (idx: number, item: any): string => {
    return value === item[valueProperty]
      ? "bg-green-50 dark:bg-black/10 border-green-200 z-10"
      : "border-gray-200";
  };

  const getValue = (item: any, valueKey: string): any => {
    let values = valueKey.split(".");
    let result = item;
    for (const val of values) {
      if (!result[val]) {
        result = null;
        break;
      }
      result = result[val];
    }
    return result;
  };

  const updateValue = (newValue: string) => {
    // Émettre la valeur d'entrée
    onChange(newValue);
  };

  useEffect(() => {
    setPaginationProperties((prevState) => ({
      ...prevState,
      activePage: 1,
    }));
  }, [searchTerm]);

  const [itemsPagined, setItemsPagined] = useState<any[]>([]);

  useEffect(() => {
    const itemsFiltered = list.filter(
      (item) =>
        item.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const minIndex =
      paginationProperties.activePage > 1
        ? (paginationProperties.activePage - 1) *
          paginationProperties.itemsPerPage
        : 0;

    let maxIndex = minIndex + paginationProperties.itemsPerPage;
    maxIndex =
      maxIndex > itemsFiltered.length ? itemsFiltered.length : maxIndex;

    const paginatedItems = itemsFiltered.slice(minIndex, maxIndex);
    setItemsPagined(paginatedItems);

    setPaginationProperties((prevState) => ({
      ...prevState,
      min: minIndex,
      max: maxIndex,
      totalItems: itemsFiltered.length,
      nextButtonIsDisabled: maxIndex >= itemsFiltered.length,
    }));
    /* eslint-disable-next-line */
  }, [
    searchTerm,
    paginationProperties.activePage,
    paginationProperties.itemsPerPage,
  ]);

  return (
    <fieldset>
      <div className="-space-y-px rounded-md bg-white dark:bg-black/10">
        {itemsPagined.map((item, idx) => (
          <label
            key={idx}
            className={`relative flex cursor-pointer items-center justify-between border p-4 first:rounded-t-md last:rounded-b-md focus:outline-none ${getClass(
              idx,
              item,
            )}`}
          >
            <div className={"flex items-center space-x-4"}>
              <input
                type="radio"
                checked={value === item[valueProperty]}
                name="privacy-setting"
                value={item[valueProperty]}
                className="mt-0.5 size-4 cursor-pointer border-gray-300 text-green-400 accent-green-700 focus:ring-gray-900"
                onChange={(e) => updateValue(e.target.value)}
              />
              <span className="ml-3 flex flex-col">
                <span
                  className={
                    value === item[valueProperty]
                      ? "block font-medium text-green-400"
                      : "block font-medium text-gray-900 dark:text-white"
                  }
                >
                  {getValue(item, titleProperty)}
                </span>
                <span
                  className={
                    value === item[valueProperty]
                      ? "block text-green-400"
                      : "block text-gray-500"
                  }
                >
                  {item[subtitleProperty]}
                </span>
              </span>
            </div>
            {getValue(item, imageProperty) && (
              <span className="mr-5 flex  justify-end">
                <Image
                  src={getValue(item, imageProperty)}
                  alt="device"
                  width={80}
                  height={80}
                />
              </span>
            )}
          </label>
        ))}
      </div>
      <div className="mt-3 flex justify-center space-x-3">
        <Button
          variant="outline"
          onClick={() =>
            setPaginationProperties((prevState) => ({
              ...prevState,
              activePage: prevState.activePage - 1,
            }))
          }
          type={"button"}
          disabled={paginationProperties.activePage === 1}
        >
          <FontAwesomeIcon size="lg" icon={["fal", "chevron-left"]} />
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            setPaginationProperties((prevState) => ({
              ...prevState,
              activePage: prevState.activePage + 1,
            }))
          }
          type={"button"}
          disabled={paginationProperties.nextButtonIsDisabled}
        >
          <FontAwesomeIcon size="lg" icon={["fal", "chevron-right"]} />{" "}
        </Button>
      </div>
    </fieldset>
  );
};

export default SelectList;
