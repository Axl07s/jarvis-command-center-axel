import { NextRequest, NextResponse } from "next/server";

// Default ElevenLabs Voice Configuration
const DEFAULT_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"; // Adam / Jarvis
const DEFAULT_MODEL_ID = process.env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2";

export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const isConfigured = Boolean(apiKey && apiKey.length > 5);

  return NextResponse.json({
    status: "ok",
    service: "ElevenLabs Neural TTS Bus",
    configured: isConfigured,
    engine: isConfigured ? "elevenlabs-cloud-streaming" : "browser-synthetic-fallback",
    defaultVoiceId: DEFAULT_VOICE_ID,
    defaultModelId: DEFAULT_MODEL_ID,
    availableVoices: [
      { id: "21m00Tcm4TlvDq8ikWAM", name: "Jarvis Prime (English Male)", role: "Human Male Voice", accent: "English / British & US" },
      { id: "EXAVITQu4vr4xnSDxMaL", name: "FRIDAY Neural (English Female)", role: "Human Female Voice", accent: "English / American" },
      { id: "es-female-voice-01", name: "Elena (Spanish Voice / España)", role: "Habla Hispana / Español", accent: "Spanish / Natural" },
    ],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, voiceId } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text payload is required" }, { status: 400 });
    }

    const selectedVoiceId = voiceId || DEFAULT_VOICE_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    // If API key is present, execute server-side ElevenLabs synthesis
    if (apiKey && apiKey.trim().length > 5) {
      // Map Spanish preset to an ElevenLabs Multilingual Voice if using cloud
      const cloudVoiceId = selectedVoiceId === "es-female-voice-01" ? "ThT5KcBeYPX3keUQqHPh" : selectedVoiceId;
      const elevenUrl = `https://api.elevenlabs.io/v1/text-to-speech/${cloudVoiceId}?optimize_streaming_latency=3`;

      const response = await fetch(elevenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey.trim(),
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: DEFAULT_MODEL_ID,
          voice_settings: {
            stability: 0.65,
            similarity_boost: 0.85,
            style: 0.15,
            use_speaker_boost: true,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn("[ElevenLabs API Warning]:", response.status, errorText);
        // Fallback to simulation gracefully
        return NextResponse.json(
          {
            fallback: true,
            reason: `ElevenLabs returned ${response.status}`,
            text,
            voiceId: selectedVoiceId,
          },
          { status: 200, headers: { "X-Voice-Engine": "fallback-simulation" } }
        );
      }

      const audioBuffer = await response.arrayBuffer();
      return new NextResponse(audioBuffer, {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Length": audioBuffer.byteLength.toString(),
          "X-Voice-Engine": "elevenlabs-live-stream",
        },
      });
    }

    // Transparent Fallback Mode when API Key is not set
    return NextResponse.json(
      {
        fallback: true,
        reason: "ELEVENLABS_API_KEY not configured in environment variables",
        text,
        voiceId: selectedVoiceId,
        engine: "browser-synthetic-fallback",
      },
      {
        status: 200,
        headers: { "X-Voice-Engine": "browser-synthetic-fallback" },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal voice synthesis error";
    return NextResponse.json({ error: message, fallback: true }, { status: 500 });
  }
}
