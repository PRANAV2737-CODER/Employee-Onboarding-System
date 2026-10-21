import { useEffect, useState } from 'react';
import { Building2, Users, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

export default function Departments() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function load() {
    try {
      const response = await api.get('/departments');
      setItems(response.data.departments || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Could not load departments'
      );
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function submit(event) {
    event.preventDefault();

    try {
      await api.post('/departments', {
        name: name.trim(),
        description: description.trim(),
      });

      toast.success('Department created successfully');

      setOpen(false);
      setName('');
      setDescription('');

      await load();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Could not create department'
      );
    }
  }

  return (
    <>
      {/* Page Heading */}
      <div className="pageheading">
        <div>
          <div className="eyebrow">ORGANIZATION STRUCTURE</div>
          <h1>Departments</h1>
          <p>Organize your people into clear teams.</p>
        </div>

        <button className="btn" onClick={() => setOpen(true)}>
          <Plus size={16} />
          Add department
        </button>
      </div>

      {/* Department Cards */}
      <div className="departmentgrid">
        {items.map((department, index) => (
          <motion.section
            className="panel departmentcard"
            key={department._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="depticon">
              <Building2 />
            </span>

            <h3>{department.name}</h3>

            <p>
              {department.description ||
                'A team working together to make things happen.'}
            </p>

            <div>
              <Users size={15} />
              {department.employeeCount || 0} employees
            </div>
          </motion.section>
        ))}
      </div>

      {/* Empty State */}
      {items.length === 0 && (
        <div className="panel empty">
          <Building2 />
          <b>No departments yet</b>
          <p>Add your first department.</p>
        </div>
      )}

      {/* Add Department Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal"
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <div className="modalhead">
                <div>
                  <h2>Add department</h2>
                  <p>Create a department for your organization.</p>
                </div>

                <button
                  type="button"
                  className="iconbtn"
                  onClick={() => setOpen(false)}
                  aria-label="Close modal"
                >
                  <X />
                </button>
              </div>

              <form className="form" onSubmit={submit}>
                <label>
                  Department name
                  <input
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. Engineering"
                  />
                </label>

                <label>
                  Description
                  <textarea
                    rows="3"
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    placeholder="What does this team do?"
                  />
                </label>

                <div className="modalactions">
                  <button
                    type="button"
                    className="smalloutline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>

                  <button className="btn" type="submit">
                    Create department
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}