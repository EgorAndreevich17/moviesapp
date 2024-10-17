import "./SectionsSwitcher.scss";

interface SectionsSwitcherProps {
  switcherState: string;
  onSwitcherChange: (state: string) => void; // Определение типа функции изменения состояния
}

export default function SectionsSwitcher({
  switcherState,
  onSwitcherChange,
}: SectionsSwitcherProps) {
  return (
    <div className="switcher-container">
      <button
        className={
          switcherState === "search" ? "switcher switcher-active" : "switcher"
        }
        onClick={() => onSwitcherChange("search")} // Передаём функцию с аргументом
      >
        Search
      </button>
      <button
        className={
          switcherState === "rated" ? "switcher switcher-active" : "switcher"
        }
        onClick={() => onSwitcherChange("rated")} // Передаём функцию с аргументом
      >
        Rated
      </button>
    </div>
  );
}
