import './Donate.scss';
import AccordionSlider from '../AccordionSlider/AccordionSlider';
import AccordionSliderMedia from '../AccordionSlider/AccordionSliderMedia/AccordionSliderMedia';

const SaveDonate = () => {
  return (
    <section className={'donate'}>
      <div className={'donate_container'}>
        <div className={'donate-wrap'}>
          <h2 className={'donate-title'}>Безпечний донат</h2>
          <AccordionSlider />
          <AccordionSliderMedia />
        </div>
      </div>
    </section>
  );
};

export default SaveDonate;
