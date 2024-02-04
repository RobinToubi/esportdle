import { Proximity } from "../lib/models/Proximity";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from '@mui/icons-material/Remove';

export interface LifeCounterProps {
  lives: Array<Proximity>;
}

export const LifeCounter = (props: LifeCounterProps) => {
  const listeComplete = Array.from(
    { length: 7 },
    (_, index) => props.lives[index] || null
  );

  const valid = (prox: Proximity | null) => {
    if (prox === null) {
        return null;
    }
    if (prox.compare.role && prox.compare.team && prox.compare.league && prox.compare.older == 0 && prox.compare.country === "VALID") {
        return true;
    }
    return false;
  }

  return (
    <div style={{ display: "inline-flex", columnGap: 3 }}>
      {listeComplete.map((valeur, index) => (
        <span key={index}>
          {valid(valeur) === true ? (
            <span>
              <CheckIcon sx={{ color: "green" }} />{" "}
            </span>
          ) : valid(valeur) === false ? (
            <span>
              <CloseIcon sx={{ color: "red" }} />
            </span>
          ) : (
            <RemoveIcon sx={{ color: "grey" }} />
            )}
        </span>
      ))}
    </div>
  );
};
