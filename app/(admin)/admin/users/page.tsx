import { GetAllUsersUseCase } from "@/application/user/get-all-users.use-case";
import { PrismaUserRepository } from "@/infrastructure/user/prisma-user.repository";
import { UserRole } from "@/domain/user/user.entity";

function RoleCell({ role }: { role: UserRole }) {
  if (role === "admin") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
        Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
      <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
      Utilisateur
    </span>
  );
}

export default async function AdminUsersPage() {
  const repo = new PrismaUserRepository();
  const users = await new GetAllUsersUseCase(repo).execute();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Utilisateurs</h2>
          <p className="mt-0.5 text-sm text-zinc-500">
            {users.length} utilisateur{users.length > 1 ? "s" : ""} enregistré
            {users.length > 1 ? "s" : ""}
          </p>
        </div>
        <p className="text-xs text-zinc-400">
          Modifiez les rôles via Prisma Studio
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                Nom
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                Rôle
              </th>
              <th className="px-4 py-3 text-left font-semibold text-zinc-500">
                Inscrit le
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user.id}
                className={`border-b border-zinc-100 last:border-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-zinc-50/30"
                }`}
              >
                <td className="px-4 py-3 font-medium text-zinc-900">
                  {user.name || <span className="text-zinc-400 italic">—</span>}
                </td>
                <td className="px-4 py-3 text-zinc-600">{user.email}</td>
                <td className="px-4 py-3">
                  <RoleCell role={user.role} />
                </td>
                <td className="px-4 py-3 text-zinc-400">
                  {user.createdAt.toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
