import Button from '@/components/Button/Button';

export default function ZeroPage() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '1rem',
      }}
    >
      {[...Array(100)].map((_, i) => (
        <Button variant="text" color="inherit" key={`text-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="contained" color="success" key={`contained-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="outlined" color="inherit" key={`outlined-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="text" color="primary" key={`text-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="contained" color="primary" key={`contained-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="outlined" color="primary" key={`outlined-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="text" color="secondary" key={`text-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="contained" color="secondary" key={`contained-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="outlined" color="secondary" key={`outlined-${i}`}>
          Button
        </Button>
      ))}
      {[...Array(100)].map((_, i) => (
        <Button variant="outlined" color="error" key={`outlined-${i}`}>
          Button
        </Button>
      ))}
    </div>
  );
}
