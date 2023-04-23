// import { TransferItem } from "antd/es/transfer";
// import { DefaultOptionType } from "antd/lib/select";
// import Select from "formik-antd/lib/select";
// import { get, isArray, isEmpty } from "lodash";
// import deburr from "vietnamese-deburr";
// import { PLACEHOLDER_MESSAGE } from "../constants/Contants";

// const { Option } = Select;

// export type SelectItem = {
//   value: number | string;
//   label: string;
//   key?: string;
// };
// export function GetSelection<
//   T extends { id: number | string; isActive?: boolean }
// >(
//   datasource: T[] = [],
//   labelField: keyof T | Array<keyof T>,
//   valueField: keyof T,
//   selectedItem?: T,
//   currentItem?: SelectItem | SelectItem[]
// ) {
//   if (isEmpty(datasource)) return [];

//   let listInitialItems: SelectItem[] = [];

//   if (isArray(currentItem)) {
//     listInitialItems = [...currentItem.filter((item) => item.value)];
//   } else {
//     currentItem && currentItem.value && listInitialItems.push(currentItem);
//   }

//   return datasource.reduce(function (
//     result: { value: number | string; label: string; key?: string }[],
//     element
//   ) {
//     if (selectedItem && element[valueField] == selectedItem[valueField])
//       return result;

//     if (
//       listInitialItems.findIndex(
//         (item) => item.value == element[valueField]
//       ) !== -1
//     ) {
//       return result;
//     }

//     if (
//       (element["isActive"] !== undefined && element["isActive"] === true) ||
//       element["isActive"] === undefined
//     ) {
//       const label = isArray(labelField)
//         ? labelField
//             .map((field: keyof T) => element[field])
//             .filter((label) => !isEmpty(label))
//             .join(" - ")
//         : element[labelField as keyof T] + "";

//       result.push({
//         value: element[valueField] as number | string,
//         label: label || "",
//         key: element.id.toString(),
//       });
//     }

//     return result;
//   },
//   listInitialItems);
// }

// export const MultiSelectSearch = (mode?: "tags" | "multiple") =>
//   mode
//     ? {
//         mode: mode,
//         allowClear: true,
//         showSearch: true,
//         placeholder: PLACEHOLDER_MESSAGE,
//         filterTreeNode: (
//           value: string,
//           option: DefaultOptionType | undefined
//         ) => {
//           return deburr(
//             option?.label?.toString().trim().toLowerCase() || ""
//           ).includes(deburr(value.trim().toLowerCase()));
//         },
//         filterOption: (
//           value: string,
//           option: DefaultOptionType | undefined
//         ) => {
//           return deburr(
//             option?.label?.toString().trim().toLowerCase() || ""
//           ).includes(deburr(value.trim().toLowerCase()));
//         },
//       }
//     : {
//         allowClear: true,
//         showSearch: true,
//         placeholder: PLACEHOLDER_MESSAGE,
//         filterTreeNode: (
//           value: string,
//           option: DefaultOptionType | undefined
//         ) => {
//           return deburr(
//             option?.label?.toString().trim().toLowerCase() || ""
//           ).includes(deburr(value.trim().toLowerCase()));
//         },
//         filterOption: (
//           value: string,
//           option: DefaultOptionType | undefined
//         ) => {
//           return deburr(
//             option?.label?.toString().trim().toLowerCase() || ""
//           ).includes(deburr(value.trim().toLowerCase()));
//         },
//       };

// export function RenderSelection<
//   T extends { id: number | string; isActive?: boolean }
// >(
//   datasource: T[],
//   labelField: keyof T,
//   valueField: keyof T,
//   currentItem?: T,
//   placeholderField?: keyof T
// ) {
//   const selections = datasource.reduce(function (
//     result: { value: number | string; label: string; placeholder: string }[],
//     element
//   ) {
//     if (currentItem && element.id === currentItem.id) return result;

//     if (
//       (element["isActive"] !== undefined && element["isActive"] === true) ||
//       element["isActive"] === undefined
//     )
//       result.push({
//         value: element[valueField] as number | string,
//         label: element[labelField] as string,
//         placeholder: placeholderField
//           ? (element[placeholderField] as string)
//           : "",
//       });

//     return result;
//   },
//   []);
//   return selections.map((slt) => (
//     <Option value={slt.value} placeholder={slt.placeholder}>
//       {slt.label}
//     </Option>
//   ));
// }

// export function GetSelectionTransfer<
//   T extends { id: number | string; isActive?: boolean }
// >(
//   datasource: T[],
//   labelField: keyof T | Array<keyof T>,
//   valueField: keyof T,
//   currentItems: TransferItem[] = []
// ) {
//   if (!datasource) return [];
//   const result = datasource.reduce(
//     function (result: TransferItem[], element) {
//       if (
//         currentItems.findIndex(
//           (item) => item.key === (element[valueField] || "").toString()
//         ) >= 0
//       )
//         return result;

//       if (!element["isActive"]) return result;
//       const key = element[valueField] + "";

//       result.push({
//         title: get(element, labelField),
//         key: key,
//         chosen: false,
//       });

//       return result;
//     },
//     currentItems ? currentItems : []
//   );

//   return result;
// }
