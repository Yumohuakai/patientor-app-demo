import { Entry } from "../../../../types";
import EntryDetails from "./EntryDetails/index";

const EntryList = ({ entries }: { entries: Entry[] }) => {
  if (entries.length === 0) {
    return null;
  } else {
    return (
      <>
        <h3>entries</h3>
        {entries.map((e) => (
          <EntryDetails key={e.id} entry={e} />
        ))}
      </>
    );
  }
};

export default EntryList;
