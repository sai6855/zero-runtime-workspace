import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function ZeroOutlinedInputPage() {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}
    >
      {[...Array(1000)].map((_, i) => (
        <FormControl key={i}>
          <InputLabel htmlFor={`input-${i}`}>Name</InputLabel>
          <OutlinedInput
            id={`input-${i}`}
            label="Label"
            placeholder="Placeholder"
          />
        </FormControl>
      ))}
    </div>
  );
}
