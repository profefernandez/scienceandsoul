const sessionRates = [
  { label: "Individual Session (50 min)", price: "$150" },
  { label: "Couples Session (50 min)", price: "$200" },
  { label: "Free Consultation (15 min)", price: "$0" },
];

const insurance = [
  "Aetna",
  "Blue Cross",
  "Cigna",
  "UnitedHealthcare",
];

export function Fees() {
  return (
    <section id="fees" style={{ background: "var(--sf2)", borderTop: "1.5px solid var(--dv)", borderBottom: "1.5px solid var(--dv)" }}>
      <div className="ww">
        <div style={{ textAlign: "center", marginBottom: "var(--sp10)" }}>
          <div className="slabel" style={{ justifyContent: "center" }}>Invest in Your Healing</div>
          <h2 className="stitle" style={{ marginInline: "auto" }}>
            Fees &amp; <em>Insurance</em>
          </h2>
        </div>
        <div className="feesgrid">
          <div className="fcard fi">
            <h3 className="fcardtitle">Session Rates</h3>
            <table className="ftable">
              <tbody>
                {sessionRates.map((r) => (
                  <tr key={r.label}>
                    <td>{r.label}</td>
                    <td>{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: "var(--sp6)", padding: "var(--sp4)", background: "var(--teall)", borderRadius: "var(--rlg)" }}>
              <div style={{ fontSize: "var(--tx-sm)", color: "var(--teal)", fontWeight: 700, marginBottom: "var(--sp1)" }}>🌙 Late Night Availability</div>
              <div style={{ fontSize: "var(--tx-sm)", color: "var(--inkm)" }}>Evening appointments available for individuals with demanding schedules.</div>
            </div>
          </div>
          <div className="fcard fi">
            <h3 className="fcardtitle">Accepted Insurance</h3>
            <ul className="inslist" role="list">
              {insurance.map((ins) => (
                <li key={ins}>{ins}</li>
              ))}
            </ul>
            <div style={{ marginTop: "var(--sp6)", fontSize: "var(--tx-sm)", color: "var(--inkm)" }}>
              Don&rsquo;t see your insurance? Contact us &mdash; we&rsquo;ll verify your benefits and explore all available options.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
