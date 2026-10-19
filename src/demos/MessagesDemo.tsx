import { useState } from "react";
import { MessageCircle, RotateCcw } from "lucide-react";
import { messageReplies, messageTopics } from "../lib/local-business";
import type { MessageTopic } from "../lib/demos.types";

export function MessagesDemo() {
  const [topic, setTopic] = useState<MessageTopic | null>(null);
  const reply = topic ? messageReplies[topic] : null;

  return (
    <div className="demo-layout local-demo-layout">
      <div className="demo-controls">
        <p className="demo-kicker">ASISTENTE DE MUESTRA</p>
        <h3>Responde lo de siempre. Atiende lo importante.</h3>
        <p className="demo-hint">
          Elige una pregunta habitual. Verás cómo podría contestarla un negocio
          local y cómo se vería la opción de hablar con una persona.
        </p>
        <p className="demo-side-note">
          <MessageCircle size={18} /> Esta conversación es ficticia. No se
          conecta a WhatsApp, no envía mensajes ni avisa a ninguna persona.
        </p>
      </div>
      <div className="local-demo-stage">
        <div className="local-chat">
          <div className="local-chat-header">
            <span className="local-chat-avatar">CB</span>
            <div>
              <strong>Café Barrio</strong>
              <small>Local ficticio · conversación de muestra</small>
            </div>
            <button
              type="button"
              aria-label="Reiniciar conversación"
              onClick={() => setTopic(null)}
            >
              <RotateCcw size={17} />
            </button>
          </div>
          <div className="local-chat-thread" aria-live="polite">
            <p className="local-bubble incoming">
              ¡Hola! ¿Qué necesitas saber? Puedes elegir una opción.
            </p>
            {topic && (
              <p className="local-bubble outgoing">
                {messageTopics.find((item) => item.id === topic)?.label}
              </p>
            )}
            {reply && (
              <div className="local-bubble incoming">
                <strong>{reply.title}</strong>
                <p>{reply.body}</p>
                <small>{reply.followUp}</small>
              </div>
            )}
          </div>
          <div className="local-chat-options" aria-label="Preguntas de ejemplo">
            {messageTopics.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={topic === item.id}
                onClick={() => setTopic(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
