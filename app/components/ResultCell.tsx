"use client"

import { TableCell, Tooltip } from "@mui/material";

export interface ResultCellProps {
  validCell: { check: () => boolean; message: string };
  invalidCell: { check: () => boolean; message: string };
  partiallyValidCell?: { check: () => boolean; message: string };
  children?: React.ReactNode;
  value: boolean | string;
}

export const ResultCell = (props: ResultCellProps) => {
  const validity = (): {
    result: string;
    message: string;
    stateColor: string;
  } => {
    if (props.partiallyValidCell?.check()) {
      return {
        result: "PARTIALLY_VALID",
        message: props.partiallyValidCell?.message,
        stateColor: "#F9B572",
      };
    } else if (props.invalidCell.check()) {
      return {
        result: "INVALID",
        message: props.invalidCell.message,
        stateColor: "#FF8080",
      };
    }
    return {
      result: "VALID",
      message: props.validCell.message,
      stateColor: "#D9EDBF",
    };
  };

  const values = validity();

  const getTooltipMessage = (defaultMessage: string) => {
    if (typeof props.value === "boolean")
      return defaultMessage;
    return `${props.value.toUpperCase()} ${defaultMessage}`;
  }

  return (
    <>
      <Tooltip title={getTooltipMessage(values.message)}>
        <TableCell style={{ backgroundColor: values.stateColor, textAlign: "center" }}>
          {props.children}
        </TableCell>
      </Tooltip>
    </>
  );
};
