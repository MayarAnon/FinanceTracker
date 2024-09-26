function TransactionList({ transactions }) {
  return (
    <div>
      <h2>Transaktionen</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.date} - {t.category} - {t.amount}€
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
