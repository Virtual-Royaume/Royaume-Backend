import { FieldNode, GraphQLResolveInfo, Kind } from "graphql";

type Fields = { [field: string]: boolean };

export function getFields(info: GraphQLResolveInfo) : Fields {
  const parentField = info.fieldNodes.find(field => field.name.value === info.fieldName);

  // Function for get fields recursively :
  const getFieldsName = (field: FieldNode): string[] => {
    const name = field.name.value;
    const selections = field.selectionSet?.selections;

    if (!selections) return [];

    const fieldsName: string[] = [];

    for (const field of selections) {
      if (field?.kind === Kind.FIELD) {
        if (field.selectionSet?.selections.length) {
          fieldsName.push(...getFieldsName(field).map(element => `${name}.${element}`));
        } else {
          fieldsName.push(`${name}.${field.name.value}`);
        }
      }
    }

    return fieldsName;
  };

  // Get array of fields :
  const arrayFields = parentField ? getFieldsName(parentField).map(element => element.replace(/\w+./, "")) : [];

  // Format and return fields :
  const fields: Fields = {};

  for (const field of arrayFields) fields[field] = true;

  return fields;
}