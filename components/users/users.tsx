import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Countries {
    countries {
      code
      name
      emoji
    }
  }
`;

export default function Countries() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return (
      <h2>
        <a href="#loading" aria-hidden="true" id="loading"></a>Loading...
      </h2>
    );
  }

  if (error) {
    console.error(error);
    return null;
  }

  const countries = data.countries.slice(0, 4);

  return (
    <div>
      {countries.map((country) => (
        <div key={country.code}>
          <h3>
            <a
              href="#country-name"
              aria-hidden="true"
              className="aal_anchor"
              id="country-name"
            ></a>
            {country.name}
          </h3>
          <p>
            {country.code} - {country.emoji}
          </p>
        </div>
      ))}
    </div>
  );
}
