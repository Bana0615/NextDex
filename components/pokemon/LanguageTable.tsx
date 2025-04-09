import { Table } from "react-bootstrap";
import { Name } from "pokenode-ts";

interface Props {
  data: Name[];
}
function LanguageTable({ data }: Props) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Language</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={`lang-${item.language.name}`}>
            <td>{item.language.name}</td>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default LanguageTable;
