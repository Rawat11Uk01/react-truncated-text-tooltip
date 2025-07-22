import TruncatedText from "./components/truncated-text";

function App() {
  const longText =
    "This is a very long text that demonstrates the line-clamping functionality. It contains multiple sentences that will be truncated after the specified number of lines, and when you hover over it, you'll see the full text in a tooltip with smooth animations.";

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <TruncatedText
            content="React Truncated Text Tooltip Component Demo"
            tag="h1"
            lines={1}
            tooltipPosition="bottom"
            className="text-4xl font-bold text-primary mb-4"
          />
          <p className="text-muted-foreground text-lg">
            A CSS-only solution for line-clamped text with hover tooltips
          </p>
        </header>

        <div className="grid gap-6">
          <TruncatedText content={longText} lines={2} className="max-w-md" />

          <TruncatedText
            content={longText}
            tooltipText="Custom tooltip text that's different from the content"
            lines={1}
            className="max-w-sm"
            tooltipPosition="top"
          />
          <TruncatedText
            content="This is a very long H2 heading that will be truncated to one line"
            tag="h2"
            lines={1}
            className="text-2xl font-semibold"
            tooltipPosition="right"
          />

          <TruncatedText
            content="This is a very long H3 heading that demonstrates tooltip positioning"
            tag="h3"
            lines={1}
            className="text-xl font-medium"
            tooltipPosition="left"
          />
        </div>

        <footer className="text-center mt-12 pt-8 border-t">
          <p className="text-muted-foreground">
            Hover over the truncated text to see the tooltips in action!
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
