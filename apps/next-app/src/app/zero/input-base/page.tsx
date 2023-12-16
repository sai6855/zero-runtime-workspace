import InputBase from '@/components/InputBase';

export default function ZeroInputBasePage() {
  return (
    <div style={{ padding: '2rem' }}>
      {[...Array(1000)].map((_, i) => (
        <InputBase placeholder="Placeholder" key={i} />
      ))}
    </div>
  );
}
