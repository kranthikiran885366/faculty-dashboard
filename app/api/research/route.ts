import { NextResponse } from "next/server"

// Mock data for research projects
const MOCK_RESEARCH = [
  {
    id: "1",
    title: "Machine Learning for Educational Assessment",
    description: "Applying machine learning algorithms to improve educational assessment methods",
    status: "In Progress",
    collaborators: [
      { id: "1", name: "John Doe", role: "Principal Investigator" },
      { id: "2", name: "Jane Smith", role: "Co-Investigator" },
      { id: "3", name: "Robert Johnson", role: "Research Assistant" },
    ],
    funding: "$75,000",
    startDate: "2023-01-15",
    deadline: "2023-12-15",
    publications: [
      {
        title: "Preliminary Results on ML-based Assessment",
        journal: "Journal of Educational Technology",
        date: "2023-06-10",
      },
    ],
  },
  {
    id: "2",
    title: "Blockchain Applications in Academic Credentialing",
    description: "Exploring the use of blockchain technology for secure academic credentials",
    status: "Planning",
    collaborators: [
      { id: "1", name: "John Doe", role: "Co-Investigator" },
      { id: "4", name: "Sarah Williams", role: "Principal Investigator" },
    ],
    funding: "$50,000",
    startDate: "2023-09-01",
    deadline: "2024-03-30",
    publications: [],
  },
  {
    id: "3",
    title: "Virtual Reality in Engineering Education",
    description: "Implementing and evaluating VR technologies in engineering education",
    status: "Completed",
    collaborators: [
      { id: "1", name: "John Doe", role: "Principal Investigator" },
      { id: "5", name: "Michael Brown", role: "Co-Investigator" },
      { id: "6", name: "Emily Davis", role: "Research Assistant" },
      { id: "7", name: "David Wilson", role: "Technical Specialist" },
    ],
    funding: "$120,000",
    startDate: "2022-03-15",
    deadline: "2023-03-15",
    publications: [
      {
        title: "VR Applications in Engineering Education",
        journal: "IEEE Transactions on Education",
        date: "2022-11-20",
      },
      {
        title: "Student Engagement with VR Learning Environments",
        journal: "Journal of Engineering Education",
        date: "2023-02-05",
      },
    ],
  },
  {
    id: "4",
    title: "AI-Powered Tutoring Systems",
    description: "Developing intelligent tutoring systems using artificial intelligence",
    status: "In Progress",
    collaborators: [
      { id: "1", name: "John Doe", role: "Co-Investigator" },
      { id: "8", name: "Lisa Chen", role: "Principal Investigator" },
      { id: "9", name: "Thomas Garcia", role: "Research Assistant" },
    ],
    funding: "$90,000",
    startDate: "2023-02-01",
    deadline: "2024-01-31",
    publications: [
      {
        title: "Framework for AI-Based Tutoring Systems",
        journal: "AI in Education Conference Proceedings",
        date: "2023-07-15",
      },
    ],
  },
]

export async function GET() {
  try {
    // In a real app, we would fetch from database and apply authentication/authorization
    return NextResponse.json(MOCK_RESEARCH)
  } catch (error) {
    console.error("Error fetching research projects:", error)
    return NextResponse.json({ error: "Failed to fetch research projects" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const researchData = await request.json()

    // In a real app, we would validate and save to database
    const newResearch = {
      id: (MOCK_RESEARCH.length + 1).toString(),
      ...researchData,
    }

    return NextResponse.json(newResearch, { status: 201 })
  } catch (error) {
    console.error("Error creating research project:", error)
    return NextResponse.json({ error: "Failed to create research project" }, { status: 500 })
  }
}
