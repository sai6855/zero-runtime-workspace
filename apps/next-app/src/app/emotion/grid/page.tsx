import Grid from '@mui/material/Unstable_Grid2';

export default function EmotionGridPage() {
  return (
    <div style={{ padding: '2rem' }}>
      {[...Array(10)].map((_, i) => (
        <Grid container spacing={{ xs: 2, sm: 3, lg: 4 }} key={i}>
          {[...Array(100)].map((_, i) => (
            <Grid key={i} xs={6} sm={3} lg={4}>
              <div style={{ border: '1px solid', textAlign: 'center' }}>
                xs=6 md=8
              </div>
            </Grid>
          ))}
        </Grid>
      ))}
    </div>
  );
}
