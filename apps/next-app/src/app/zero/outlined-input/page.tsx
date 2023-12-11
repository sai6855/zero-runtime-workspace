import OutlinedInput from '@/components/OutlinedInput';
import FormControl from '@/components/FormControl';
import InputLabel from '@/components/InputLabel';

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

{
  /* <FormControl>
  <InputLabel htmlFor="component-outlined">Name</InputLabel>
  <OutlinedInput
    id="component-outlined"
    defaultValue="Composed TextField"
    label="Name"
  />
</FormControl>; */
}
