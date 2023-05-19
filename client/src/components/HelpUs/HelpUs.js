import "./HelpUs.scss";

const HelpUs = () => {
  return (
    <div className={"help"}>
      <h3 className={"help_title-h3"}>
        Існує багато способів допомоги - оберіть свій
      </h3>
      <p className={"help_description"}>
        Допомога вуличним котам не обмежується лише фінансами. Постійно
        потребуємо кормів, медикаментів, розповсюдження інформації тощо.
      </p>
      <div className={"help_post"}>
        <h4 className={"help_title-h4"}>Наше відділення НП для посилок</h4>
        <p className={"help_post-text"}>№225 м.Київ пр.С.Бандери</p>
        <p className={"help_post-text"}>+38 063 6286630</p>
      </div>
    </div>
  );
};

export default HelpUs;
