import { BadgeCheck, BookOpen, CheckSquare, Clock3, Leaf, ListChecks } from 'lucide-react'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'

interface Assignment {
  id: string
  type: 'READING' | 'INTEGRATION'
  mode: 'INDIVIDUAL' | 'GROUP'
  dueAt: string | null
  createdAt: string
  libraryItem: { id: string; title: string }
}

interface Member {
  student: { id: string; name: string; email: string }
  joinedAt: string
}

interface Submission {
  id: string
  status: string
  createdAt: string
  student: { id: string; name: string; email: string }
  assignment: { id: string; type: 'READING' | 'INTEGRATION'; libraryItem: { title: string } }
  review?: { resultStatus: string } | null
}

interface ClassDetail {
  id: string
  name: string
  code: string
  teacher: { id: string; name: string; email: string }
  memberships: Member[]
  assignments: Assignment[]
}

type MainTab = 'assignments' | 'students' | 'criteria' | 'pending'
type TaskType = 'READING' | 'INTEGRATION'
type IconButtonItem = { key: MainTab | 'community'; label: string; icon: ReactNode }

const iconButtons: IconButtonItem[] = [
  { key: 'assignments', label: 'Bài tập', icon: <BookOpen className="h-8 w-8" /> },
  { key: 'students', label: 'Danh sách', icon: <ListChecks className="h-8 w-8" /> },
  { key: 'pending', label: 'Bài chờ duyệt', icon: <CheckSquare className="h-8 w-8" /> },
  { key: 'criteria', label: 'Tiêu chí', icon: <Clock3 className="h-8 w-8" /> },
  { key: 'community', label: 'Cộng đồng', icon: <Leaf className="h-8 w-8" /> },
]

function isMainTab(key: IconButtonItem['key']): key is MainTab {
  return key !== 'community'
}

function parseClassAndSchool(input: string): { className: string; schoolName: string } | null {
  const normalized = input.trim().replace(/\s+/g, ' ')
  const [className, ...schoolParts] = normalized.split('-').map((part) => part.trim())
  const schoolName = schoolParts.join(' - ').trim()

  if (!className || !schoolName) return null
  return { className, schoolName }
}

export default function TeacherClassDetail() {
  const { classId } = useParams<{ classId: string }>()
  const navigate = useNavigate()
  const [cls, setCls] = useState<ClassDetail | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<MainTab>('assignments')
  const [taskType, setTaskType] = useState<TaskType>('READING')
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clsRes, subRes] = await Promise.all([
          api.get(`/classes/${classId}`),
          api.get(`/classes/${classId}/submissions`),
        ])
        setCls(clsRes.data.data)
        setSubmissions(subRes.data.data)
      } catch {
        setError('Không thể tải thông tin lớp học.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [classId])

  const typedAssignments = useMemo(() => {
    if (!cls) return []
    return cls.assignments.filter((a) => a.type === taskType)
  }, [cls, taskType])

  useEffect(() => {
    if (typedAssignments.length === 0) {
      setSelectedAssignmentId(null)
      return
    }
    if (!selectedAssignmentId || !typedAssignments.some((a) => a.id === selectedAssignmentId)) {
      setSelectedAssignmentId(typedAssignments[0].id)
    }
  }, [typedAssignments, selectedAssignmentId])

  const pendingByTaskType = useMemo(() => submissions.filter((s) => s.assignment.type === taskType), [submissions, taskType])

  const selectedPending = useMemo(() => {
    if (!selectedAssignmentId) return []
    return pendingByTaskType.filter((s) => s.assignment.id === selectedAssignmentId)
  }, [pendingByTaskType, selectedAssignmentId])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#1f3f8f]" />
      </div>
    )
  }

  if (error || !cls) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <p className="text-red-600">{error}</p>
        <Link to="/teacher/dashboard" className="mt-4 inline-block text-[#1f3f8f] hover:underline">← Quay lại</Link>
      </div>
    )
  }

  const students = cls.memberships.map((m) => m.student)
  const parsedClass = parseClassAndSchool(cls.name)
  const classLabel = parsedClass?.className ?? cls.name
  const schoolLabel = parsedClass?.schoolName ?? 'Chưa có'

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#efeff1] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="space-y-4">
          {/* ROW 1: LỚP + TRƯỜNG + ICON */}
          <div className="flex items-center justify-between">

            {/* LEFT: LỚP + TRƯỜNG */}
            <div className="flex items-center gap-10">

              {/* LỚP */}
              <div className="flex h-[40px] w-[260px] items-center rounded-full border-2 border-[#7de69d] bg-[#f3fffb] px-2 shadow-[inset_0_0_0_2px_#bdf5cd]">
                <span className="flex h-[30px] items-center rounded-full bg-gradient-to-b from-[#1f3f8f] to-[#149fb3] px-4 text-[14px] font-black uppercase text-white">
                  Lớp
                </span>
                <span className="ml-4 text-[20px] font-extrabold text-[#1f3f8f]">
                  {classLabel}
                </span>
              </div>

              {/* TRƯỜNG */}
              <div className="flex h-[40px] w-[520px] items-center rounded-full border-2 border-[#7de69d] bg-[#f3fffb] px-2 shadow-[inset_0_0_0_2px_#bdf5cd]">
                <span className="flex h-[30px] items-center rounded-full bg-gradient-to-b from-[#1f3f8f] to-[#149fb3] px-4 text-[14px] font-black uppercase text-white">
                  Trường
                </span>
                <span className="ml-4 text-[20px] font-extrabold text-[#1f3f8f]">
                  {schoolLabel}
                </span>
              </div>

            </div>

            {/* RIGHT: ICON */}
            <div className="flex items-center gap-1 text-[#1f3f8f]">
              {iconButtons.map((item, index) => {
                const isActive = item.key !== "community" && activeTab === item.key

                return (
                  <div key={item.key} className="relative flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (!isMainTab(item.key)) {
                          navigate("/community")
                          return
                        }
                        setActiveTab(item.key)
                      }}
                      className={`group p-1 sm:p-2 transition-opacity ${
                        isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                      }`}
                      aria-label={item.label}
                      title={item.label} // fallback cho mobile/không hover
                    >
                      <span className="text-[#1f3f8f] [&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-9 sm:[&_svg]:w-9">
                        {item.icon}
                      </span>

                      {/* Tooltip: chỉ hiện từ sm trở lên */}
                      <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-bold text-[#1f3f8f] shadow-md opacity-0 transition-opacity duration-200 sm:block sm:group-hover:opacity-100">
                        {item.label}
                      </span>
                    </button>

                    {/* Divider: mảnh hơn trên mobile */}
                    {index !== iconButtons.length - 1 && (
                      <div className="h-6 w-[2px] bg-[#1f3f8f] opacity-60 sm:h-8" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ROW 2: MÃ */}
          <div className="flex h-[40px] w-[260px] items-center rounded-full border-2 border-[#7de69d] bg-[#f3fffb] px-2 shadow-[inset_0_0_0_2px_#bdf5cd]">
            <span className="flex h-[30px] items-center rounded-full bg-gradient-to-b from-[#1f3f8f] to-[#149fb3] px-4 text-[14px] font-black uppercase text-white">
              Mã
            </span>
            <span className="ml-4 text-[20px] font-extrabold uppercase text-[#1f3f8f]">
              {cls.code}
            </span>
          </div>

        </div>

        {activeTab === 'assignments' && (
          <div>
            <Link
              to={`/teacher/create-assignment/${classId}`}
              className="mb-10 mt-12 inline-flex h-16 items-center gap-3 rounded-[20px] border-2 border-[#1f3f8f] bg-gradient-to-b from-[#1f3f8f] to-[#149fb3] px-5 text-lg font-bold text-white shadow-[inset_0_0_0_1px_#39bfd0] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_#39bfd0,0_8px_14px_rgba(31,63,143,0.25)] active:translate-y-0 active:scale-[0.98]"
            >
              <span className="text-2xl leading-none">+</span>
              Tải bài tập mới lên
            </Link>

            {cls.assignments.length === 0 ? (
              <div className="rounded-[20px] bg-[#cbeff2] px-6 py-20 text-center text-lg text-[#1f3f8f]">Chưa có bài tập nào.</div>
            ) : (
              <div className="space-y-4">
                {cls.assignments.map((a, idx) => (
                  <div key={a.id} className="rounded-[20px] bg-[#cbeff2] px-6 py-5 text-[#1f3f8f]">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="text-2xl font-extrabold">Bài tập {idx + 1}</h3>
                      <button className="text-2xl">⋮</button>
                    </div>
                    <p className="text-lg font-semibold">{a.mode === 'INDIVIDUAL' ? 'Cá nhân' : 'Nhóm'}: {a.libraryItem.title}</p>
                    {a.dueAt && <p className="mt-1 text-sm font-semibold">Ngày hoàn thành: {new Date(a.dueAt).toLocaleDateString('vi-VN')}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="overflow-hidden rounded-[20px] border border-[#7ea2e0] bg-white">
            <h2 className="py-4 text-center text-3xl font-black uppercase text-[#1f3f8f]">Danh sách học sinh</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] border-collapse text-center text-[#1f3f8f]">
                <thead>
                  <tr className="bg-[#cbeff2] text-lg font-bold">
                    <th className="border border-[#7ea2e0] px-3 py-2">STT</th>
                    <th className="border border-[#7ea2e0] px-3 py-2">Họ và tên</th>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <th key={i} className="border border-[#7ea2e0] px-3 py-2">{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: Math.max(10, students.length) }).map((_, rowIdx) => {
                    const student = students[rowIdx]
                    return (
                      <tr key={rowIdx} className="text-sm font-semibold">
                        <td className="border border-[#7ea2e0] px-2 py-2">{rowIdx + 1}</td>
                        <td className="border border-[#7ea2e0] px-3 py-2 text-left">{student?.name ?? ''}</td>
                        {Array.from({ length: 10 }).map((__, colIdx) => {
                          const assignment = cls.assignments[colIdx]
                          const sub = assignment ? submissions.find((s) => s.assignment.id === assignment.id && s.student.id === student?.id) : undefined
                          return (
                            <td key={colIdx} className="border border-[#7ea2e0] px-2 py-2">
                              {!sub && <span className="text-gray-300">•</span>}
                              {sub && !sub.review && <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-400" />}
                              {sub?.review?.resultStatus === 'PASSED' && <BadgeCheck className="mx-auto h-4 w-4 text-green-600" />}
                              {sub?.review?.resultStatus === 'FAILED' && <span className="text-red-500">✕</span>}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeTab === 'criteria' || activeTab === 'pending') && (
          <div>
            <div className="mx-auto mb-6 flex w-full max-w-[380px] overflow-hidden rounded-full border-2 border-[#8be9a0] bg-[#f5fffd]">
              <button
                onClick={() => setTaskType('READING')}
                className={`w-1/2 py-2 text-xl font-extrabold ${taskType === 'READING' ? 'rounded-full border border-cyan-300 bg-gradient-to-b from-[#1f3f8f] to-[#149fb3] text-white' : 'text-[#1f3f8f]'}`}
              >
                Đọc hiểu
              </button>
              <button
                onClick={() => setTaskType('INTEGRATION')}
                className={`w-1/2 py-2 text-xl font-extrabold ${taskType === 'INTEGRATION' ? 'rounded-full border border-cyan-300 bg-gradient-to-b from-[#1f3f8f] to-[#149fb3] text-white' : 'text-[#1f3f8f]'}`}
              >
                Tích hợp
              </button>
            </div>

            {activeTab === 'criteria' && (
              <div className="min-h-[260px] rounded-[20px] bg-[#cbeff2] p-8 text-center text-2xl text-[#1f3f8f]">
                Tiêu chí {taskType === 'READING' ? 'đọc hiểu' : 'tích hợp'}
              </div>
            )}

            {activeTab === 'pending' && (
              <>
                <div className="mb-6 flex flex-wrap gap-3">
                  {typedAssignments.map((a, idx) => (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAssignmentId(a.id)}
                      className={`rounded-full border-2 px-5 py-2 text-lg font-bold transition-all duration-200 hover:-translate-y-0.5 ${selectedAssignmentId === a.id ? 'border-[#1f3f8f] bg-gradient-to-b from-[#1f3f8f] to-[#149fb3] text-white shadow-[inset_0_0_0_1px_#39bfd0]' : 'border-[#7aa3df] bg-white text-[#1f3f8f] hover:bg-[#eef5ff]'}`}
                    >
                      Bài tập {idx + 1}
                    </button>
                  ))}
                </div>

                {selectedPending.length === 0 ? (
                  <div className="rounded-[20px] bg-[#cbeff2] px-6 py-8 text-lg text-[#1f3f8f]">Không có bài chờ duyệt.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {selectedPending.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => navigate(`/teacher/review/${s.id}`)}
                        className="relative rounded-full bg-[#cbeff2] px-6 py-3 text-base font-bold text-[#1f3f8f]"
                      >
                        {s.student.name}
                        {s.review?.resultStatus === 'PASSED' && <BadgeCheck className="absolute -right-1 -top-1 h-5 w-5 text-green-600" />}
                        {s.review?.resultStatus === 'FAILED' && <span className="absolute -right-1 -top-1 text-red-500">✕</span>}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
